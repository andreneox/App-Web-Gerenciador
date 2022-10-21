from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker



# Criando uma sqlite engine instance
engine = create_engine("sqlite:///product.db")

# Criando uma DeclarativeMeta instance
Base = declarative_base()

# Criando uma SessionLocal class do sessionmaker do sqalchemy
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)