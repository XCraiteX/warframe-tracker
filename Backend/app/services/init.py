from data.models import Warframes
from config import WARFRAMES, NOT_PRIME
from data.db import session

async def init_frames(email: str):

    async with session() as db:
        frames = []
        for key in WARFRAMES.keys():
            frame = Warframes(
                user=email,
                warframe=key,
                name=WARFRAMES[key]
            ) 
            frames.append(frame)
            
            if key not in NOT_PRIME:
                frame = Warframes(
                    user=email,
                    warframe=key + 'prime',
                    name=WARFRAMES[key] + ' Прайм'
                ) 
                frames.append(frame)
        
        db.add_all(frames)
        await db.commit()