import bcrypt

async def hash_string(string: str) -> str:
    
    salt = bcrypt.gensalt()

    hashed_string = bcrypt.hashpw(string.encode('UTF-8'), salt)

    return hashed_string.decode('UTF-8')


async def check_hashes(string1: str, hashed_string: str) -> bool:

    status = bcrypt.checkpw(string1.encode('UTF-8'), hashed_string.encode('UTF-8'))

    return status