BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Tour] ADD [DestinationImage4] NVARCHAR(1000),
[destinationImage1] NVARCHAR(1000),
[destinationImage2] NVARCHAR(1000),
[destinationImage3] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[user] ADD [profileImage] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
