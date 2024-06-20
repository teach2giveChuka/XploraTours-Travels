BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[user] (
    [userId] VARCHAR(255) NOT NULL,
    [firstname] NVARCHAR(1000) NOT NULL,
    [lastname] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [updatedAt] DATETIME2,
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [user_role_df] DEFAULT 'user',
    [accountStatus] NVARCHAR(1000) NOT NULL CONSTRAINT [user_accountStatus_df] DEFAULT 'active',
    [isNotified] BIT NOT NULL CONSTRAINT [user_isNotified_df] DEFAULT 0,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([userId]),
    CONSTRAINT [user_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Tour] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [Tour_id_df] DEFAULT NEWID(),
    [destination] NVARCHAR(1000) NOT NULL,
    [duration] INT NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [tourType] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Tour_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [isActive] BIT NOT NULL CONSTRAINT [Tour_isActive_df] DEFAULT 1,
    CONSTRAINT [Tour_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Booking] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [Booking_id_df] DEFAULT NEWID(),
    [userId] VARCHAR(255) NOT NULL,
    [tourId] UNIQUEIDENTIFIER NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Booking_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Booking_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Review] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [Review_id_df] DEFAULT NEWID(),
    [content] NVARCHAR(1000) NOT NULL,
    [rating] INT NOT NULL,
    [userId] VARCHAR(255) NOT NULL,
    [tourId] UNIQUEIDENTIFIER NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Review_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Review_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Review_userId_tourId_key] UNIQUE NONCLUSTERED ([userId],[tourId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[user]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_tourId_fkey] FOREIGN KEY ([tourId]) REFERENCES [dbo].[Tour]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Review] ADD CONSTRAINT [Review_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[user]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Review] ADD CONSTRAINT [Review_tourId_fkey] FOREIGN KEY ([tourId]) REFERENCES [dbo].[Tour]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
