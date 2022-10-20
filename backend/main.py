from fastapi import FastAPI, status, HTTPException
from database import Base, engine
from sqlalchemy.orm import Session
import models
import schemas



# Create the database
Base.metadata.create_all(engine)

# Initialize app
app = FastAPI()



@app.get("/")
def root():
    return "produto"

@app.post("/product", status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.Product):
 # create a new database session
    session = Session(bind=engine, expire_on_commit=False)

    # create an instance of the ToDo database model
    productdb = models.Product(name = product.name, price = product.price, serie = product.serie)

    # add it to the session and commit it
    session.add(productdb)
    session.commit()

    # grab the id given to the object from the database
    id = productdb.id

    # close the session
    session.close()

    # return the id
    return f"criado um produto com a id {id}"

@app.get("/product/{id}")
def read_product(id: int):
     # create a new database session
    session = Session(bind=engine, expire_on_commit=False)

    # get the todo item with the given id
    product = session.query(models.Product).get(id)

    # check if todo item with given id exists. If not, raise exception and return 404 not found response
    if not product:
        raise HTTPException(status_code=404, detail=f"Produto com id {id} nao encontrado")

    return product


@app.put("/product/{id}")
def update_product(id: int, name: str, price:int, serie: int):
    # create a new database session
    session = Session(bind=engine, expire_on_commit=False)

    # get the todo item with the given id
    product = session.query(models.Product).get(id)

    # update todo item with the given task (if an item with the given id was found)
    if product:
        product.name = name
        product.price = price
        product.serie = serie

        session.commit()

    # close the session
    session.close()

    # check if todo item with given id exists. If not, raise exception and return 404 not found response
    if not product:
        raise HTTPException(status_code=404, detail=f"Produto com o id {id} nao encontrado!")

    return product

@app.delete("/product/{id}")
def delete_product(id: int):
    
    # create a new database session
    session = Session(bind=engine, expire_on_commit=False)

    # get the todo item with the given id
    product = session.query(models.Product).get(id)

    # if todo item with given id exists, delete it from the database. Otherwise raise 404 error
    if product:
        session.delete(product)
        session.commit()
        session.close()
    else:
        raise HTTPException(status_code=404, detail=f"Produto com o id {id} nao encontrado!")

    return None

@app.get("/product")
def read_product_list():
     # create a new database session
    session = Session(bind=engine, expire_on_commit=False)

    # get all todo items
    product_list = session.query(models.Product).all()

    # close the session
    session.close()

    return product_list
