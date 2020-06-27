use [master]

create database EventPlannerDB
go

use EventPlannerDB
go

create table AvailableFunds
(
	AvailableFundsID int primary key identity,
	AvailableMoney money
)
go
create table CreditCard
(
	CreditCardID int primary key identity,
	CardName nvarchar(30)
)
go
create table Ticket
(
	TicketID int primary key identity,
	PriceInKunas int,
	Info nvarchar(1000)
)
go
create table [User]
(
	UserID int primary key identity,
	Email nvarchar(100),
	[Password] nvarchar(20),
	FirstName nvarchar(20),
	LastName nvarchar(20),
	Age int,
	IBAN nvarchar (21),
	Info nvarchar (1000),  
	AdminUser bit, 
	IDCreditCard int foreign key references CreditCard(CreditCardID),
	IDAvailableFunds int foreign key references AvailableFunds(AvailableFundsID)
)
go
create table [Transaction]
(
	TransactionID int primary key identity,
	TimeOfPurchase datetime,
	Info nvarchar(1000),
	IDTicket int foreign key references Ticket(TicketID),
	IDUser int foreign key references [User](UserID)
)
go
create table [Location]
(
	LocationID int primary key identity,
	City nvarchar(40),
	Adresse nvarchar(40)
)
go
create table [Event]
(
	EventID int primary key identity,
	Title nvarchar(200),
	Starting datetime2(2),
	Ending datetime2(2),
	Info nvarchar(1000),
	IDUser int foreign key references [User](UserID),
	IDLocation int foreign key references Location(LocationID),
	IDTicket int foreign key references Ticket(TicketID)
)
go


create proc insert_dummy_data
as
	insert into AvailableFunds (AvailableMoney) values (100), (124), (1234), (1999)
	insert into CreditCard (CardName) values ('Mastercard '), ('Visa'), ('American Express')
	insert into [Location] (City, Adresse) values ('Zagreb', 'Ilica 191'), ('Zagreb', 'Ilica 201')
	insert into [User] (Email, [Password], FirstName, LastName, Age, IBAN, Info, AdminUser, IDCreditCard, IDAvailableFunds) values 
		('email@mail.com', 'pass', 'Ana', 'Anic', 22, '', 'Lorem ipsum dolor sit amet', 1, 1, 1), ('email@mail.com', 'pass', 'Matea', 'Mateic', 29, 'HRV12325432445', 'Lorem ipsum dolor sit amet', 0, 2, 2)
	insert into Ticket (PriceInKunas, Info) values (120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis'), (60, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis')
	insert into [Transaction] (TimeOfPurchase, Info, IDTicket, IDUser) values ('12:00', 'Lorem Ipsum', 1, 1), ('21:36', 'Lorem Ipsum', 2, 2)
	insert into [Event] (Title, Starting, Ending, Info, IDUser, IDLocation, IDTicket) 
		values ('Lorem ipsum dolor sit amet', '01-01-2020 16:00:00', '01-01-2020 22:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque.',
		1,1,1), ('Lorem ipsum dolor sit amet','02-02-2020 21:00:00', '02-03-2020 00:05:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque.',
		2,2,2)
go

exec insert_dummy_data
go


drop proc insert_dummy_data
go

select * from [User]
go


