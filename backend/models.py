from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base
from sqlalchemy.orm import relationship

# Definindo a class Produto herdando da Base
class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True,autoincrement=True)
    name = Column(String(60))
    price = Column(Integer) 
    serie = Column(Integer)
    category_id = Column(Integer, ForeignKey('category.id'))
    

# Definindo a class Categoria herdando da Base
class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True,autoincrement=True)
    name = Column(String(128), nullable=False)
    
      