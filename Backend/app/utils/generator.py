import random
from string import ascii_letters, digits

from config import SESSION_KEY_LENGTH

SYMBOLS = ascii_letters + digits

async def generate_session_key() -> str:

    session_key = ''.join([SYMBOLS[random.randint(0, len(SYMBOLS) - 1)] for _ in range(SESSION_KEY_LENGTH)])

    return session_key