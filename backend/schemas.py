from pydantic import BaseModel

# Create ToDo Schema (Pydantic Model)
class ProductCreate(BaseModel):
    name: str
    price: int
    serie: int


# Create ToDoRequest Base Model
class Product(BaseModel):
    id: int
    name: str
    price: int
    serie: int

    class Config:
        orm_mode = True