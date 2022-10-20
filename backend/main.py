from typing import List
from fastapi import FastAPI, status, HTTPException, Depends
from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
import models
import schemas





# Create the database
Base.metadata.create_all(engine)

# Initialize app
app = FastAPI()

# Helper function to get database session
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()



@app.get("/")
def root():
    return "produto"

@app.post("/product", response_model=schemas.Product, status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.ProductCreate, session: Session = Depends(get_session)):

    # create an instance of the ToDo database model
    productdb = models.Product(name = product.name, price = product.price, serie = product.serie)

    # add it to the session and commit it
    session.add(productdb)
    session.commit()
    session.refresh(productdb)

    # return the id
    return productdb

@app.get("/product/{id}", response_model=schemas.Product)
def read_product(id: int, session: Session = Depends(get_session) ):
     
    # get the todo item with the given id
    product = session.query(models.Product).get(id)

    # check if todo item with given id exists. If not, raise exception and return 404 not found response
    if not product:
        raise HTTPException(status_code=404, detail=f"Produto com id {id} nao encontrado")

    return product


@app.put("/product/{id}")
def update_product(id: int, name: str, price:int, serie: int, session: Session = Depends(get_session)):
   
    # get the todo item with the given id
    product = session.query(models.Product).get(id)

    # update todo item with the given task (if an item with the given id was found)
    if product:
        product.name = name
        product.price = price
        product.serie = serie

        session.commit()


    # check if todo item with given id exists. If not, raise exception and return 404 not found response
    if not product:
        raise HTTPException(status_code=404, detail=f"Produto com o id {id} nao encontrado!")

    return product

@app.delete("/product/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(id: int, session: Session = Depends(get_session)):
 
    # get the todo item with the given id
    product = session.query(models.Product).get(id)

    # if todo item with given id exists, delete it from the database. Otherwise raise 404 error
    if product:
        session.delete(product)
        session.commit()
       
    else:
        raise HTTPException(status_code=404, detail=f"Produto com o id {id} nao encontrado!")

    return None

@app.get("/product", response_model = List[schemas.Product])
def read_product_list(session: Session = Depends(get_session)):

    # get all todo items
    product_list = session.query(models.Product).all()

    return product_list
