from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict

# --- ENUMS FOR STATUS TRACKING ---
class ItemStatus(str, Enum):
    AVAILABLE = "Available"
    LOCKED = "Locked_in_Escrow"
    COMPLETED = "Completed"

class TransactionStatus(str, Enum):
    PENDING = "Pending_Handoff"
    RELEASED = "Released"
    DISPUTED = "Disputed"

# --- MONGODB DATABASE MODELS ---
class UserModel(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    name: str
    college_email: EmailStr
    is_verified: bool = False
    bank_details_linked: bool = False

    model_config = ConfigDict(
        populate_by_name=True,
    )

class ItemModel(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    seller_id: str
    title: str
    description: str
    price: float
    status: ItemStatus = ItemStatus.AVAILABLE

    model_config = ConfigDict(
        populate_by_name=True,
    )

class TransactionModel(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    buyer_id: str
    seller_id: str
    item_id: str
    total_amount: float
    commission_amount: float
    seller_payout: float
    qr_hash: str
    status: TransactionStatus = TransactionStatus.PENDING

    model_config = ConfigDict(
        populate_by_name=True,
    )