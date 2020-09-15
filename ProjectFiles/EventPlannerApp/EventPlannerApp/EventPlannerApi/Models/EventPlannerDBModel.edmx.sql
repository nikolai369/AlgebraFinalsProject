
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 09/13/2020 17:35:59
-- Generated from EDMX file: C:\Users\rokgr\Desktop\AlgebraFinalsProject\ProjectFiles\EventPlannerApp\EventPlannerApp\EventPlannerApi\Models\EventPlannerDBModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [EventPlannerDB];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK__Event__IDLocatio__34C8D9D1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Event] DROP CONSTRAINT [FK__Event__IDLocatio__34C8D9D1];
GO
IF OBJECT_ID(N'[dbo].[FK__Event__IDTicket__35BCFE0A]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Event] DROP CONSTRAINT [FK__Event__IDTicket__35BCFE0A];
GO
IF OBJECT_ID(N'[dbo].[FK__Event__IDUser__33D4B598]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Event] DROP CONSTRAINT [FK__Event__IDUser__33D4B598];
GO
IF OBJECT_ID(N'[dbo].[FK__Going__IDEvent__398D8EEE]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Going] DROP CONSTRAINT [FK__Going__IDEvent__398D8EEE];
GO
IF OBJECT_ID(N'[dbo].[FK__Going__IDUser__38996AB5]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Going] DROP CONSTRAINT [FK__Going__IDUser__38996AB5];
GO
IF OBJECT_ID(N'[dbo].[FK__Transacti__IDTic__300424B4]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Transaction] DROP CONSTRAINT [FK__Transacti__IDTic__300424B4];
GO
IF OBJECT_ID(N'[dbo].[FK__Transacti__IDUse__30F848ED]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Transaction] DROP CONSTRAINT [FK__Transacti__IDUse__30F848ED];
GO
IF OBJECT_ID(N'[dbo].[FK__User__IDAvailabl__29572725]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[User] DROP CONSTRAINT [FK__User__IDAvailabl__29572725];
GO
IF OBJECT_ID(N'[dbo].[FK__User__IDCreditCa__286302EC]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[User] DROP CONSTRAINT [FK__User__IDCreditCa__286302EC];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[AvailableFunds]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AvailableFunds];
GO
IF OBJECT_ID(N'[dbo].[CreditCard]', 'U') IS NOT NULL
    DROP TABLE [dbo].[CreditCard];
GO
IF OBJECT_ID(N'[dbo].[Event]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Event];
GO
IF OBJECT_ID(N'[dbo].[Going]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Going];
GO
IF OBJECT_ID(N'[dbo].[Location]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Location];
GO
IF OBJECT_ID(N'[dbo].[Ticket]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Ticket];
GO
IF OBJECT_ID(N'[dbo].[Transaction]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Transaction];
GO
IF OBJECT_ID(N'[dbo].[User]', 'U') IS NOT NULL
    DROP TABLE [dbo].[User];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'AvailableFunds'
CREATE TABLE [dbo].[AvailableFunds] (
    [AvailableFundsID] int IDENTITY(1,1) NOT NULL,
    [AvailableMoney] decimal(19,4)  NULL
);
GO

-- Creating table 'CreditCard'
CREATE TABLE [dbo].[CreditCard] (
    [CreditCardID] int IDENTITY(1,1) NOT NULL,
    [CardName] nvarchar(30)  NULL
);
GO

-- Creating table 'Event'
CREATE TABLE [dbo].[Event] (
    [EventID] int IDENTITY(1,1) NOT NULL,
    [Title] nvarchar(200)  NULL,
    [Starting] datetime  NULL,
    [Ending] datetime  NULL,
    [Info] nvarchar(1000)  NULL,
    [IDUser] int  NULL,
    [IDLocation] int  NULL,
    [IDTicket] int  NULL
);
GO

-- Creating table 'Going'
CREATE TABLE [dbo].[Going] (
    [GoingID] int IDENTITY(1,1) NOT NULL,
    [IDUser] int  NULL,
    [IDEvent] int  NULL
);
GO

-- Creating table 'Location'
CREATE TABLE [dbo].[Location] (
    [LocationID] int IDENTITY(1,1) NOT NULL,
    [City] nvarchar(40)  NULL,
    [Adresse] nvarchar(40)  NULL,
    [longitude] decimal(9,6)  NULL,
    [latitude] decimal(8,6)  NULL
);
GO

-- Creating table 'sysdiagrams'
CREATE TABLE [dbo].[sysdiagrams] (
    [name] nvarchar(128)  NOT NULL,
    [principal_id] int  NOT NULL,
    [diagram_id] int IDENTITY(1,1) NOT NULL,
    [version] int  NULL,
    [definition] varbinary(max)  NULL
);
GO

-- Creating table 'Ticket'
CREATE TABLE [dbo].[Ticket] (
    [TicketID] int IDENTITY(1,1) NOT NULL,
    [PriceInKunas] int  NULL,
    [Info] nvarchar(1000)  NULL
);
GO

-- Creating table 'Transaction'
CREATE TABLE [dbo].[Transaction] (
    [TransactionID] int IDENTITY(1,1) NOT NULL,
    [TimeOfPurchase] datetime  NULL,
    [Info] nvarchar(1000)  NULL,
    [IDTicket] int  NULL,
    [IDUser] int  NULL
);
GO

-- Creating table 'User'
CREATE TABLE [dbo].[User] (
    [UserID] int IDENTITY(1,1) NOT NULL,
    [Email] nvarchar(100)  NULL,
    [Password] nvarchar(20)  NULL,
    [FirstName] nvarchar(20)  NULL,
    [LastName] nvarchar(20)  NULL,
    [Age] int  NULL,
    [IBAN] nvarchar(21)  NULL,
    [Info] nvarchar(1000)  NULL,
    [AdminUser] bit  NULL,
    [IDCreditCard] int  NULL,
    [IDAvailableFunds] int  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [AvailableFundsID] in table 'AvailableFunds'
ALTER TABLE [dbo].[AvailableFunds]
ADD CONSTRAINT [PK_AvailableFunds]
    PRIMARY KEY CLUSTERED ([AvailableFundsID] ASC);
GO

-- Creating primary key on [CreditCardID] in table 'CreditCard'
ALTER TABLE [dbo].[CreditCard]
ADD CONSTRAINT [PK_CreditCard]
    PRIMARY KEY CLUSTERED ([CreditCardID] ASC);
GO

-- Creating primary key on [EventID] in table 'Event'
ALTER TABLE [dbo].[Event]
ADD CONSTRAINT [PK_Event]
    PRIMARY KEY CLUSTERED ([EventID] ASC);
GO

-- Creating primary key on [GoingID] in table 'Going'
ALTER TABLE [dbo].[Going]
ADD CONSTRAINT [PK_Going]
    PRIMARY KEY CLUSTERED ([GoingID] ASC);
GO

-- Creating primary key on [LocationID] in table 'Location'
ALTER TABLE [dbo].[Location]
ADD CONSTRAINT [PK_Location]
    PRIMARY KEY CLUSTERED ([LocationID] ASC);
GO

-- Creating primary key on [diagram_id] in table 'sysdiagrams'
ALTER TABLE [dbo].[sysdiagrams]
ADD CONSTRAINT [PK_sysdiagrams]
    PRIMARY KEY CLUSTERED ([diagram_id] ASC);
GO

-- Creating primary key on [TicketID] in table 'Ticket'
ALTER TABLE [dbo].[Ticket]
ADD CONSTRAINT [PK_Ticket]
    PRIMARY KEY CLUSTERED ([TicketID] ASC);
GO

-- Creating primary key on [TransactionID] in table 'Transaction'
ALTER TABLE [dbo].[Transaction]
ADD CONSTRAINT [PK_Transaction]
    PRIMARY KEY CLUSTERED ([TransactionID] ASC);
GO

-- Creating primary key on [UserID] in table 'User'
ALTER TABLE [dbo].[User]
ADD CONSTRAINT [PK_User]
    PRIMARY KEY CLUSTERED ([UserID] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [IDAvailableFunds] in table 'User'
ALTER TABLE [dbo].[User]
ADD CONSTRAINT [FK__User__IDAvailabl__29572725]
    FOREIGN KEY ([IDAvailableFunds])
    REFERENCES [dbo].[AvailableFunds]
        ([AvailableFundsID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__User__IDAvailabl__29572725'
CREATE INDEX [IX_FK__User__IDAvailabl__29572725]
ON [dbo].[User]
    ([IDAvailableFunds]);
GO

-- Creating foreign key on [IDCreditCard] in table 'User'
ALTER TABLE [dbo].[User]
ADD CONSTRAINT [FK__User__IDCreditCa__286302EC]
    FOREIGN KEY ([IDCreditCard])
    REFERENCES [dbo].[CreditCard]
        ([CreditCardID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__User__IDCreditCa__286302EC'
CREATE INDEX [IX_FK__User__IDCreditCa__286302EC]
ON [dbo].[User]
    ([IDCreditCard]);
GO

-- Creating foreign key on [IDLocation] in table 'Event'
ALTER TABLE [dbo].[Event]
ADD CONSTRAINT [FK__Event__IDLocatio__34C8D9D1]
    FOREIGN KEY ([IDLocation])
    REFERENCES [dbo].[Location]
        ([LocationID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Event__IDLocatio__34C8D9D1'
CREATE INDEX [IX_FK__Event__IDLocatio__34C8D9D1]
ON [dbo].[Event]
    ([IDLocation]);
GO

-- Creating foreign key on [IDTicket] in table 'Event'
ALTER TABLE [dbo].[Event]
ADD CONSTRAINT [FK__Event__IDTicket__35BCFE0A]
    FOREIGN KEY ([IDTicket])
    REFERENCES [dbo].[Ticket]
        ([TicketID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Event__IDTicket__35BCFE0A'
CREATE INDEX [IX_FK__Event__IDTicket__35BCFE0A]
ON [dbo].[Event]
    ([IDTicket]);
GO

-- Creating foreign key on [IDUser] in table 'Event'
ALTER TABLE [dbo].[Event]
ADD CONSTRAINT [FK__Event__IDUser__33D4B598]
    FOREIGN KEY ([IDUser])
    REFERENCES [dbo].[User]
        ([UserID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Event__IDUser__33D4B598'
CREATE INDEX [IX_FK__Event__IDUser__33D4B598]
ON [dbo].[Event]
    ([IDUser]);
GO

-- Creating foreign key on [IDEvent] in table 'Going'
ALTER TABLE [dbo].[Going]
ADD CONSTRAINT [FK__Going__IDEvent__398D8EEE]
    FOREIGN KEY ([IDEvent])
    REFERENCES [dbo].[Event]
        ([EventID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Going__IDEvent__398D8EEE'
CREATE INDEX [IX_FK__Going__IDEvent__398D8EEE]
ON [dbo].[Going]
    ([IDEvent]);
GO

-- Creating foreign key on [IDUser] in table 'Going'
ALTER TABLE [dbo].[Going]
ADD CONSTRAINT [FK__Going__IDUser__38996AB5]
    FOREIGN KEY ([IDUser])
    REFERENCES [dbo].[User]
        ([UserID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Going__IDUser__38996AB5'
CREATE INDEX [IX_FK__Going__IDUser__38996AB5]
ON [dbo].[Going]
    ([IDUser]);
GO

-- Creating foreign key on [IDTicket] in table 'Transaction'
ALTER TABLE [dbo].[Transaction]
ADD CONSTRAINT [FK__Transacti__IDTic__300424B4]
    FOREIGN KEY ([IDTicket])
    REFERENCES [dbo].[Ticket]
        ([TicketID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Transacti__IDTic__300424B4'
CREATE INDEX [IX_FK__Transacti__IDTic__300424B4]
ON [dbo].[Transaction]
    ([IDTicket]);
GO

-- Creating foreign key on [IDUser] in table 'Transaction'
ALTER TABLE [dbo].[Transaction]
ADD CONSTRAINT [FK__Transacti__IDUse__30F848ED]
    FOREIGN KEY ([IDUser])
    REFERENCES [dbo].[User]
        ([UserID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Transacti__IDUse__30F848ED'
CREATE INDEX [IX_FK__Transacti__IDUse__30F848ED]
ON [dbo].[Transaction]
    ([IDUser]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------