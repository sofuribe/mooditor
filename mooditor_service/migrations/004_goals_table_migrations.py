steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE goals (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT REFERENCES users(id),
            goal TEXT,
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_completed BOOLEAN DEFAULT false
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE goals;
        """,
    ],
]
