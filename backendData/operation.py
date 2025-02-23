import pandas as pd
import math

def get_json_data(csv_file):
    df = pd.read_csv(csv_file)
    json_format = df.set_index('Player')['RatingScore'].to_dict()

    keys_to_remove = [k for k, v in json_format.items() if isinstance(v, float) and math.isnan(v)]
    for k in keys_to_remove:
        del json_format[k]
    
    return json_format