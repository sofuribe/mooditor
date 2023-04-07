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
            entry_id INT NOT NULL,
            user_id INT NOT NULL,
            activity_name VARCHAR(50),
            mood MOOD_TYPE NOT NULL,
            journal TEXT,
            created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE entries;
        """
    ],
]
