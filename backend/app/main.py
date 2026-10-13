"""Mafqoodi Platform Backend Application Entrypoint."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(
    title="Mafqoodi Platform API",
    description="AI-powered lost and found platform API for Palestine",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Root"])
async def root():
    return {
        "platform": "Mafqoodi",
        "description": "AI-Powered Lost & Found Platform",
        "version": "1.0.0",
        "documentation": "/docs"
    }


@app.get("/api/v1/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "mafqoodi-backend",
        "environment": os.getenv("ENVIRONMENT", "development")
    }

