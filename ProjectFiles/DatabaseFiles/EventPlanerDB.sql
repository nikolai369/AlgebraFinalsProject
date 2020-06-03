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
	TotalPrice money,
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