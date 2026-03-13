from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Restaurant Info for AI
RESTAURANT_INFO = """
You are the AI assistant for Catrina's Tacos & Tequilas, a festive Mexican restaurant in Independence, MO.

LOCATION: 19801 E Valley View Pkwy, Independence, MO 64057
PHONE: (816) 534-9203
HOURS: 
- Sunday: 11 AM - 9 PM
- Monday: 11 AM - 9 PM
- Tuesday: 11 AM - 9 PM
- Wednesday: 11 AM - 9 PM
- Thursday: 11 AM - 10 PM
- Friday: 11 AM - 11 PM
- Saturday: 11 AM - 11 PM

PRICE RANGE: $10-$20 per person
RATING: 4.5 stars (757 reviews)

POPULAR MENU ITEMS:
- Birria Tacos with Rice and Beans ($14) - Slow-braised beef in rich consomé
- Creamy Chicken Enchiladas with Rice ($13) - Smothered in house-made salsa verde
- Chips and Salsa ($6) - Fresh tortilla chips with house salsa
- Pollo Asado ($15) - Citrus-marinated grilled chicken
- Steak Fajitas ($18) - Sizzling with peppers and onions
- Elote Mexican Street Corn ($7) - Grilled with cotija and lime crema
- Nopales Tacos ($12) - Vegetarian, grilled cactus with pico
- Avocado Rice Bowl ($11) - Fresh and vegetarian-friendly
- Taco Salad ($10) - Crispy tortilla bowl with fresh greens
- Pulled Pork Tacos ($13) - Slow-roasted carnitas

DRINKS & COCKTAILS:
- Tropical Fruit Margarita ($12) - House special with fresh fruit
- Margarita Flights ($18) - Sample 4 signature margaritas
- Premium Tequila Selection - Over 50 varieties
- Paleta Mexicana ($8) - Frozen fruit popsicle cocktail

SPECIALS:
- Happy Hour: Mon-Fri 3-6 PM, $5 margaritas
- Taco Tuesday: $2 tacos
- Mariachi Night: Every Friday 7-9 PM

ATMOSPHERE: Colorful, festive Día de los Muertos theme with authentic Mexican art and decor. Great for families, date nights, and celebrations.

DIETARY OPTIONS: Vegetarian options available including Nopales Tacos and Avocado Rice Bowl.

RESERVATIONS: We accept walk-ins and waitlist reservations through our website.

Be friendly, helpful, and embody the festive spirit of La Catrina. Use occasional Spanish phrases naturally. If asked about something not on the menu or outside your knowledge, politely suggest they call the restaurant.
"""

# Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class WaitlistEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    party_size: int
    date: str
    time: str
    special_requests: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class WaitlistCreate(BaseModel):
    name: str
    phone: str
    party_size: int
    date: str
    time: str
    special_requests: Optional[str] = None

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to Catrina's Tacos & Tequilas API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Waitlist endpoints
@api_router.post("/waitlist", response_model=WaitlistEntry)
async def create_waitlist_entry(entry: WaitlistCreate):
    waitlist_obj = WaitlistEntry(**entry.model_dump())
    doc = waitlist_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.waitlist.insert_one(doc)
    logger.info(f"New waitlist entry: {waitlist_obj.name} for {waitlist_obj.party_size} on {waitlist_obj.date}")
    return waitlist_obj

@api_router.get("/waitlist", response_model=List[WaitlistEntry])
async def get_waitlist():
    entries = await db.waitlist.find({}, {"_id": 0}).to_list(1000)
    for entry in entries:
        if isinstance(entry.get('created_at'), str):
            entry['created_at'] = datetime.fromisoformat(entry['created_at'])
    return entries

# AI Chat endpoint
@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(chat: ChatMessage):
    try:
        api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not api_key:
            raise HTTPException(status_code=500, detail="AI service not configured")
        
        session_id = chat.session_id or str(uuid.uuid4())
        
        # Retrieve chat history from database
        history = await db.chat_history.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1).to_list(20)
        
        llm_chat = LlmChat(
            api_key=api_key,
            session_id=session_id,
            system_message=RESTAURANT_INFO
        ).with_model("openai", "gpt-5.2")
        
        # Add history to context
        for msg in history:
            if msg.get("role") == "user":
                llm_chat.messages.append({"role": "user", "content": msg["content"]})
            elif msg.get("role") == "assistant":
                llm_chat.messages.append({"role": "assistant", "content": msg["content"]})
        
        user_message = UserMessage(text=chat.message)
        response = await llm_chat.send_message(user_message)
        
        # Store messages in database
        timestamp = datetime.now(timezone.utc).isoformat()
        await db.chat_history.insert_one({
            "session_id": session_id,
            "role": "user",
            "content": chat.message,
            "timestamp": timestamp
        })
        await db.chat_history.insert_one({
            "session_id": session_id,
            "role": "assistant",
            "content": response,
            "timestamp": timestamp
        })
        
        return ChatResponse(response=response, session_id=session_id)
        
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat service error: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
