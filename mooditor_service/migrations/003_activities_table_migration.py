steps = [
    [
        # "Up" SQL statement
        """
        CREATE TYPE activities_name AS ENUM (
            'walking', 'gym', 'running', 'video games',
            'snowboarding', 'biking', 'reading', 'sports', 'swimming',
            'hiking', 'meditate', 'yoga', 'skiing', 'cooking', 'sleeping'
        );
        """,
        """
        DROP TYPE activities_name;
        """,
    ],
    [
        """
        CREATE TABLE activities (
            id SERIAL PRIMARY KEY NOT NULL,
            entry_id INT NOT NULL,
            name VARCHAR(50)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE activities;
        """,
    ],
]
