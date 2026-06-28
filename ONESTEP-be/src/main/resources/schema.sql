IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'support')
    CREATE TABLE support (
        id          BIGINT        NOT NULL IDENTITY(1,1),
        title       NVARCHAR(200) NOT NULL,
        category    NVARCHAR(20)  NOT NULL,
        region      NVARCHAR(20)  NOT NULL,
        deadline    DATE          NOT NULL,
        description NVARCHAR(500) NOT NULL,
        created_at  DATETIME2     NOT NULL DEFAULT SYSDATETIME(),
        updated_at  DATETIME2     NOT NULL DEFAULT SYSDATETIME(),
        CONSTRAINT PK_support PRIMARY KEY (id)
    )
GO
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_support_category' AND object_id = OBJECT_ID('support'))
    CREATE INDEX IX_support_category ON support (category)
GO
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_support_region' AND object_id = OBJECT_ID('support'))
    CREATE INDEX IX_support_region ON support (region)
GO
