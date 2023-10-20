def cut_function(delimiter, column, text):
    column_int = int(column)
    for line in text:
        result = line.split(f"{delimiter}")
        print(result[column_int - 1])
    return 0
