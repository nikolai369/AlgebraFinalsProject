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
	Info nvarchar(100),
	QRCode nvarchar(max)
)
go
create table [Transaction]
(
	TransactionID int primary key identity,
	TimeOfPurchase datetime,
	Info nvarchar(200),
	IDTicket int foreign key references Ticket(TicketID)
)
go
create table [User]
(
	UserID int primary key identity,
	FirstName nvarchar(20),
	LastName nvarchar(20),
	Age int,
	IDTransaction int foreign key references [Transaction](TransactionID),
	IDCreditCard int foreign key references CreditCard(CreditCardID),
	IDAvailableFunds int foreign key references AvailableFunds(AvailableFundsID)
)
go
create table [Location]
(
	LocationID int primary key identity,
	[State] nvarchar(30),
	City nvarchar(40),
	StreetName nvarchar(40),
	Coordinates geography
)
go
create table EventStatistics
(
	EventStatisticsID int primary key identity,
	NumberOfInterested int,
	NumberOfGoing int,
	NumberOfBoughtTickets int
)
go
create table EventHost
(
	EventHostID int primary key identity,
	FirstName nvarchar(30),
	LastName nvarchar(30),
	IBAN nvarchar(40),/*max 34*/
	Info nvarchar(100),
	IDAvailableFunds int foreign key references AvailableFunds(AvailableFundsID)
	
)
create table Review
(
	ReviewID int primary key identity,
	Info nvarchar(1000),
	DateMade datetime,
	Score float,
	IDUser int foreign key references [User](UserID)
)
go
create table PlaceOfEvent
(
	PlaceOfEventID int primary key identity,
	Info nvarchar(1000),
	IDReview int foreign key references Review(ReviewID),
	IDEventHost int foreign key references EventHost(EventHostID)
)
go
create table [Event]
(
	EventID int primary key identity,
	DateOfEvent date,
	TimeOfStart time,
	TimeOfEnd time,
	Info nvarchar(1000),
	IDLocation int foreign key references Location(LocationID),
	IDEventHost int foreign key references EventHost(EventHostID),
	IDPlaceOfEvent int foreign key references PlaceOfEvent(PlaceOfEventID),
	IDEventStatistics int foreign key references EventStatistics(EventStatisticsID)
)
go
create table [Admin]
(
	AdminID int primary key identity,
	Username nvarchar(30),
	[Password] nvarchar(30)
)
go
create table WebPageStatistics
(
	WebPageStatisticsID int primary key identity,
	NumberOfSoldTickets int,
	NumberOfGoingUsersToAllEvents int,
	NumberOfInterestedUsersToAllEvents int,
	NumberOfEventsMade int,
	NumberOfRegisteredUsers int,
	NumberOfRegisteredEventHosts int,
	TotalBalanceFromSoldTickets money,
	AvgTicketsSoldByDay float,
	AvgTicketsSoldByWeek float,
	AvgTicketsSoldByMonth float,
	IDAdmin int foreign key references [Admin](AdminID)
)
go

create proc insert_dummy_data
as
	insert into [Admin] (Username,  [Password]) values ('test', 'test')
	insert into AvailableFunds (AvailableMoney) values (100), (124), (1234), (1999)
	insert into CreditCard (CardName) values ('Mastercard '), ('Visa'), ('American Express')
	insert into EventHost (FirstName, LastName, IBAN, Info, IDAvailableFunds) values ('Pero', 'Peric', 'HR123456', 'Hosting events since 2001',1), ('Mate', 'Matic', 'HR892649346', 'Best host 2010',2)
	insert into EventStatistics (NumberOfInterested, NumberOfGoing, NumberOfBoughtTickets) values (1000, 500, 376)
	insert into [Location] ([State], City, StreetName, Coordinates) values ('Hrvatska', 'Zagreb', 'Ilica 201',geography::STGeomFromText('LINESTRING(-122.360 47.656, -122.343 47.656 )', 4326)),
		('Hrvatska', 'Split', 'Pijaca',geography::STGeomFromText('LINESTRING(-122.360 47.656, -122.343 47.656 )', 4326))
	insert into Ticket (PriceInKunas, Info, QRCode) values (120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis', 12345667), (60, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis', 123456)
	insert into [Transaction] (TimeOfPurchase, Info, IDTicket) values ('12:00', 'Lorem Ipsum', 1), ('21:36', 'Lorem Ipsum', 2)
	insert into [User] (FirstName, LastName, Age, IDTransaction, IDCreditCard, IDAvailableFunds) values ('Ana', 'Anic', 22, 1, 1, 1), ('Matea', 'Mateic', 29, 2, 3, 3)
	insert into Review (Info, DateMade, Score, IDUser) values ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor.',
		'01-01-2020', 7, 1),
		('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor.',
		'11-04-2020', 5, 2)
	insert into PlaceOfEvent (Info, IDReview, IDEventHost) values ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque. In feugiat purus eu euismod feugiat. Phasellus auctor urna nisi, in lacinia arcu vestibulum ac. Etiam vitae porttitor dolor, vel aliquam est. Nam maximus rutrum mi, sit amet tincidunt sem ultricies in. Vestibulum ullamcorper sapien ex, at cursus risus viverra a.',
		1,1),('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque. In feugiat purus eu euismod feugiat. Phasellus auctor urna nisi, in lacinia arcu vestibulum ac. Etiam vitae porttitor dolor, vel aliquam est. Nam maximus rutrum mi, sit amet tincidunt sem ultricies in. Vestibulum ullamcorper sapien ex, at cursus risus viverra a.',
		2,2)
	insert into [Event] (DateOfEvent, TimeOfStart, TimeOfEnd, Info, IDLocation, IDEventHost, IDPlaceOfEvent,IDEventStatistics) 
		values ('01-01-2020', '16:00', '20:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque.',
		1,1,1,1), ('11-03-2020', '06:00', '22:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque.',
		2,2,2,1)
	insert into WebPageStatistics (NumberOfSoldTickets, NumberOfGoingUsersToAllEvents, NumberOfInterestedUsersToAllEvents, NumberOfRegisteredEventHosts, NumberOfRegisteredUsers) 
		values (100, 230, 454, 12, 122)
go

--exec insert_dummy_data
--go
--drop proc insert_dummy_data
--go
