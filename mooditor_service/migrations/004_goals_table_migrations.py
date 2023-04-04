steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE goals (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT NOT NULL REFERENCES users(id),
            goals TEXT,
            created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            is_completed BOOLEAN DEFAULT false
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE goals;
        """
    ],
]