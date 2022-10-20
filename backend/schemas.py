from pydantic import BaseModel

# Create ToDoRequest Base Model
class Product(BaseModel):
    name: str
    price: int
    serie: int