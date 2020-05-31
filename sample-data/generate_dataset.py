import random


#
# Quick script for temporary data generation
#

north_south = [49, 55]
west_east = [14, 25]

def generate_data_bounds(west_east = west_east,
                         north_south = north_south):
    dataset = []
    i = west_east[0]
    while i <= west_east[1]:
        dataset.append([north_south[0], i])
        dataset.append([north_south[1], i])
        i += 0.002
    i = north_south[0]
    while i <= north_south[1]:
        dataset.append([i, west_east[0]])
        dataset.append([i, west_east[1]])
        i += 0.002
    return dataset

def get_pair(west_east, north_south):
    return [random.uniform(north_south[0], north_south[1]),
            random.uniform(west_east[0], west_east[1])]

def generate_data_random(amount,
                         west_east = west_east,
                         north_south = north_south):
    dataset = []
    for i in range(amount):
        dataset.append(get_pair(west_east, north_south))
    return dataset

def get_range_fraction(full_range, fraction):
    return (full_range[1] - full_range[0]) * fraction + full_range[0]

def generate_data_hotspots(hotspots, fill = True):
    dataset = []
    if fill:
        dataset += generate_data_random(300, west_east, north_south)
    for hotspot in hotspots:
        assert len(hotspot[0]) == 2 and len(hotspot[1]) == 2
        assert (0 <= hotspot[0][1] <= 1 and 0 <= hotspot[0][0] <= 1 and
                0 <= hotspot[1][0] <= 1 and 0 <= hotspot[1][1] <= 1)
        ns = [get_range_fraction(north_south, hotspot[0][0]), get_range_fraction(north_south, hotspot[0][1])]
        we = [get_range_fraction(west_east, hotspot[1][0]), get_range_fraction(west_east, hotspot[1][1])]
        dataset += generate_data_random(200, we, ns)
    return dataset

def wrap(x, y, comma = ','):
    return 'new google.maps.LatLng({}, {}){}\n  '.format(x, y, comma)

def generate_output(data, before = 'const dataset = `[\n  ', wrap = wrap,
                    after = ']`'):
    output = before
    for pair in data:
        output += wrap(round(pair[0], 5), round(pair[1], 5))
    return output + after

def save_as(filename, text):
    with open(filename, 'w') as file:
        file.write(text)

# dataset = generate_data_bounds()
# dataset = generate_data_random(250)
dataset = generate_data_hotspots([[[0.6, 0.9], [0.4, 0.99]], [[0.2, 0.5], [0.1, 0.4]]])
output = generate_output(dataset)
save_as('./hotspotsDataset.js', output)

# for i in range(100):
#   print(wrap[0] + str(round(14.12298 + random.random()*10, 5)) + wrap[1] + str(round(49.00238 + random.random()*4.5, 5)) + wrap[2])