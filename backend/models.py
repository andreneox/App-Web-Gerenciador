from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base
from sqlalchemy.orm import relationship

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
    
      