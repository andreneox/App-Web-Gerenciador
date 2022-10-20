from numbers import Number
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

# Create a sqlite engine instance
engine = create_engine("sqlite:///product.db")

# Create a DeclarativeMeta instance
Base = declarative_base()

# Define To Do class inheriting from Base
class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True,autoincrement=True)
    name = Column(String(60))
    price = Column(Integer) 
    serie = Column(Integer)
    


class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True,autoincrement=True)
    name = Column(String(128), nullable=False)
    
      
