steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE user (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user;
        """
    ],

]

