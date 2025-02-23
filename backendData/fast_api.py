from fastapi import FastAPI, HTTPException
from typing import List, Dict

app = FastAPI()

# # Static data simulating the players available by position
# positions = ["PG", "SG", "SF", "PF", "C"]
# players_by_position = {
#     "PG": ["Chris Paul", "Stephen Curry", "Damian Lillard", "Russell Westbrook"],
#     "SG": ["Klay Thompson", "James Harden", "Devin Booker", "Donovan Mitchell"],
#     "SF": ["LeBron James", "Kevin Durant", "Kawhi Leonard", "Jimmy Butler"],
#     "PF": ["Giannis Antetokounmpo", "Anthony Davis", "Jayson Tatum", "Draymond Green"],
#     "C": ["Nikola Jokic", "Joel Embiid", "Rudy Gobert", "Bam Adebayo"]
# }

# best_players = {
#     "PG": "Stephen Curry",
#     "SG": "James Harden",
#     "SF": "LeBron James",
#     "PF": "Giannis Antetokounmpo",
#     "C": "Nikola Jokic"
# }

# # Endpoint to fetch available players by position
# @app.get("/players/{position}", response_model=Dict[str, List[str]])
# def get_players_by_position(position: str):
#     if position not in positions:
#         raise HTTPException(status_code=404, detail="Position not found")
#     return {"players": players_by_position[position]}

# # Endpoint to compare selected players
# @app.post("/compare", response_model=Dict[str, Dict[str, str]])
# def compare_players(PG: str, SG: str, SF: str, PF: str, C: str):
#     # Ensure all positions have a player selected
#     selections = {"PG": PG, "SG": SG, "SF": SF, "PF": PF, "C": C}
    
#     for pos, player in selections.items():
#         if not player:
#             raise HTTPException(status_code=400, detail=f"Please select a player for {pos}")
    
#     comparison_results = {
#         "Your Picks": selections,
#         "Best Players": best_players
#     }
#     return comparison_results

# Sample root endpoint
@app.get("/shooting-guard")
def read_root():
    return {"message": "Welcome to the NBA Player Comparison API!"}

