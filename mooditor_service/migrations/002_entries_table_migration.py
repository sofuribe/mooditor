steps = [
    [
        # "Up" SQL statement
        """
            CREATE TYPE mood_type as ENUM (
            'awful',
            'okay',
            'good',
            'great'
        );
        """,
        # "Down" SQL statement
        """
        DROP TYPE mood_type;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE entries (
            id serial NOT NULL PRIMARY KEY,
            user_id INT,
            mood MOOD_TYPE NOT NULL,
            journal TEXT,
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE entries;
        """
    ],
]
