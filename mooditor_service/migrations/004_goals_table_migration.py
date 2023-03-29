steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE goals (
            id SERIAL PRIMARY KEY NOT NULL,
            goals TEXT,
            is_completed BOOLEAN DEFAULT false
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE goals;
        """
    ],
]