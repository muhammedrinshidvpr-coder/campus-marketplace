# Product Requirements Document (PRD): CampusTrade

## 1. Product Overview
**CampusTrade** is a hyper-local, mobile-first web application designed exclusively for university students. It solves the trust and logistical issues of buying, selling, and renting items on campus. The platform acts as a digital escrow broker, holding buyer funds and taking a commission before releasing the payment to the seller upon a successful in-person physical handoff (verified via QR code).

## 2. Core Objectives (MVP)
* **Zero-Scam Environment:** Restrict access strictly to users with verified university email addresses (`.edu` or equivalent institution domains).
* **Frictionless Handoff:** Eliminate shipping completely. Buyers and sellers meet at designated safe zones on campus.
* **Automated Monetization:** Platform takes a 5-10% cut of every transaction automatically without handling physical goods.

## 3. The Golden Path (User Journey)
1. **Authentication:** User signs up using their college email. A verification link is sent to activate the account.
2. **Browsing/Listing:** Seller posts a used textbook or drafting tool for ₹500. Buyer sees it on the local feed.
3. **Escrow Payment:** Buyer clicks "Buy." They pay ₹500 via the in-app payment gateway. The platform holds this money in escrow. The seller receives a notification: *"Item paid for. Ready for handoff."*
4. **The Meetup:** App instructs both parties to meet at a campus landmark (e.g., the Main Engineering Block or Library). 
5. **The Handoff & Payout:** They meet. The buyer inspects the item. The buyer generates a unique QR code on their phone. The seller scans it with their phone. 
6. **Completion:** The QR scan triggers the backend API. The platform deducts a ₹50 commission and instantly routes ₹450 to the seller's linked bank account.

## 4. Required Tech Stack & Architecture
* **Frontend:** React.js or Next.js (Mobile-responsive design, clean UI, QR code generator/scanner components).
* **Backend:** Python (FastAPI or Flask) to handle API routes, user auth, and escrow logic securely.
* **Database:** MongoDB (using Motor or PyMongo) to store Users, Listings, and Transaction States.
* **Payment Integration:** Razorpay Route (Optimized for split-payments and escrow features).

## 5. Database Schema Requirements

### Users Collection
* `ID`: UUID
* `Name`: String
* `College_Email`: String (Must validate domain)
* `Is_Verified`: Boolean
* `Bank_Details_Linked`: Boolean

### Items Collection
* `Item_ID`: UUID
* `Seller_ID`: UUID (Foreign Key)
* `Title`: String
* `Description`: String
* `Price`: Integer/Float
* `Status`: Enum (`Available`, `Locked_in_Escrow`, `Completed`)

### Transactions Collection
* `Transaction_ID`: UUID
* `Buyer_ID`: UUID (Foreign Key)
* `Seller_ID`: UUID (Foreign Key)
* `Item_ID`: UUID (Foreign Key)
* `Total_Amount`: Integer/Float
* `Commission_Amount`: Integer/Float
* `Seller_Payout`: Integer/Float
* `QR_Hash`: String (Encrypted token for handoff validation)
* `Status`: Enum (`Pending_Handoff`, `Released`, `Disputed`)

## 6. Out of Scope for MVP (Do NOT build yet)
* Complex bidding/auction systems.
* Shipping or postal integrations.
* Paid advertisements or premium seller tiers.
* Cross-campus trading (keep it restricted to one campus for beta).