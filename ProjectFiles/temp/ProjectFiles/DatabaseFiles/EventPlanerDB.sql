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
	Info nvarchar(1000),
	QRCode nvarchar(max)
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
	Email nvarchar(100),
	[Password] nvarchar(20),
	FirstName nvarchar(30),
	LastName nvarchar(30),
	IBAN nvarchar(40),/*max 34*/
	Info nvarchar(1000),
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
	PlaceName nvarchar(100),
	Info nvarchar(1000),
	IDReview int foreign key references Review(ReviewID),
	IDEventHost int foreign key references EventHost(EventHostID)
)
go
create table [Event]
(
	EventID int primary key identity,
	EventName nvarchar(200),
	DateOfEvent date,
	TimeOfStart time,
	TimeOfEnd time,
	Info nvarchar(1000),
	IDLocation int foreign key references Location(LocationID),
	IDEventHost int foreign key references EventHost(EventHostID),
	IDPlaceOfEvent int foreign key references PlaceOfEvent(PlaceOfEventID),
	IDEventStatistics int foreign key references EventStatistics(EventStatisticsID),
	IDTicket int foreign key references Ticket(TicketID)
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
	insert into [Admin] (Username,  [Password]) values ('admin', 'admin')
	insert into AvailableFunds (AvailableMoney) values (100), (124), (1234), (1999)
	insert into CreditCard (CardName) values ('Mastercard '), ('Visa'), ('American Express')
	insert into EventHost (Email, [Password], FirstName, LastName, IBAN, Info, IDAvailableFunds) values ('email@mail.com', 'pass', 'Pero', 'Peric', 'HR123456', 'Hosting events since 2001',1), ('email@mail.com', 'pass', 'Mate', 'Matic', 'HR892649346', 'Best host 2010',2)
	insert into EventStatistics (NumberOfInterested, NumberOfGoing, NumberOfBoughtTickets) values (1000, 500, 376)
	insert into [Location] ([State], City, StreetName, Coordinates) values ('Hrvatska', 'Zagreb', 'Ilica 201',geography::STGeomFromText('LINESTRING(-122.360 47.656, -122.343 47.656 )', 4326)),
		('Hrvatska', 'Split', 'Pijaca',geography::STGeomFromText('LINESTRING(-122.360 47.656, -122.343 47.656 )', 4326))
	insert into Ticket (PriceInKunas, Info, QRCode) values (120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis', 12345667), (60, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis', 123456)
	insert into [User] (Email, [Password], FirstName, LastName, Age, IDCreditCard, IDAvailableFunds) values ('email@mail.com', 'pass', 'Ana', 'Anic', 22, 1, 1), ('email@mail.com', 'pass', 'Matea', 'Mateic', 29, 3, 3)
	insert into [Transaction] (TimeOfPurchase, Info, IDTicket, IDUser) values ('12:00', 'Lorem Ipsum', 1, 1), ('21:36', 'Lorem Ipsum', 2, 2)
	insert into Review (Info, DateMade, Score, IDUser) values ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor.',
		'01-01-2020', 7, 1),
		('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor.',
		'11-04-2020', 5, 2)
	insert into PlaceOfEvent (PlaceName, Info, IDReview, IDEventHost) values ('Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque. In feugiat purus eu euismod feugiat. Phasellus auctor urna nisi, in lacinia arcu vestibulum ac. Etiam vitae porttitor dolor, vel aliquam est. Nam maximus rutrum mi, sit amet tincidunt sem ultricies in. Vestibulum ullamcorper sapien ex, at cursus risus viverra a.',
		1,1),('Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque. In feugiat purus eu euismod feugiat. Phasellus auctor urna nisi, in lacinia arcu vestibulum ac. Etiam vitae porttitor dolor, vel aliquam est. Nam maximus rutrum mi, sit amet tincidunt sem ultricies in. Vestibulum ullamcorper sapien ex, at cursus risus viverra a.',
		2,2)
	insert into [Event] (EventName, DateOfEvent, TimeOfStart, TimeOfEnd, Info, IDLocation, IDEventHost, IDPlaceOfEvent,IDEventStatistics, IDTicket) 
		values ('Lorem ipsum dolor sit amet', '01-01-2020', '16:00', '20:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque.',
		1,1,1,1,1), ('Lorem ipsum dolor sit amet', '11-03-2020', '06:00', '22:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque.',
		2,2,2,1,2)
	insert into WebPageStatistics (NumberOfSoldTickets, NumberOfGoingUsersToAllEvents, NumberOfInterestedUsersToAllEvents, NumberOfRegisteredEventHosts, NumberOfRegisteredUsers) 
		values (100, 230, 454, 12, 122)
go

exec insert_dummy_data
go

-------------------------------------------------------------
-- USER
-- CRUD user
-- C
create proc insert_user
	@Email nvarchar(100),
	@Password nvarchar(20),
	@FirstName nvarchar(30),
	@LastName nvarchar(30),
	@Age int,
	@IDCreditCard int, 
	@IDAvailableFunds int
as
	insert into [User] (Email, [Password], FirstName, LastName, Age, IDCreditCard, IDAvailableFunds) values 
		(@Email, @Password, @FirstName, @LastName, @Age, @IDCreditCard, @IDAvailableFunds)
go

-- D
create proc delete_user
	@UserID int
as	
	delete from [User] where UserID = @UserID
go


-- U
create proc update_user
	@UserID int,
	@Email nvarchar(100),
	@Password nvarchar(20),
	@FirstName nvarchar(30),
	@Lastname nvarchar(30),
	@Age int
as
	update [User] set Email = @Email, [Password] = @Password, FirstName = @FirstName, LastName = @Lastname, Age = @Age
		where UserID = @UserID
go



-- R
-- dohvat svih podataka o useru
create proc select_user_info
	@UserID int
as
	select u.Email, u.FirstName, u.LastName, u.Age, c.CardName, af.AvailableMoney from [User] as u
	left join CreditCard as c on c.CreditCardID = u.IDCreditCard
	left join AvailableFunds as af on af.AvailableFundsID = u.IDAvailableFunds
	where UserID = @UserID
go

-- dohvat svih reviewova od usera
create proc select_all_reviews_by_user_id
	@UserID int
as 
	select * from Review where IDUser = @UserID
go
-- dohvat svih transakcija i karata(zajedno) od usera
create proc select_user_transactions
	@UserID int
as
	select tr.Info as 'Transaction info', tr.TimeOfPurchase, t.PriceInKunas, t.Info as 'Ticket info', t.QRCode from [Transaction] as tr
	left join Ticket as t on t.TicketID = tr.IDTicket
	left join [User] as u on u.UserID = tr.IDUser
	where UserID = @UserID
go


-- dohvat dostupne svote novca usera
create proc select_user_account_balance
	@UserID int
as
	select AvailableMoney from AvailableFunds
	left join [User] as u on u.IDAvailableFunds = AvailableFunds.AvailableFundsID
	where u.UserID = @UserID
go


--EVENT
-- CRUD event
-- C
create proc insert_event
	@EventName nvarchar(200),
	@DateOfEvent date,
	@TimeOfStart time,
	@TimeOfEnd time,
	@Info nvarchar(1000), 
	@IDLocation int,
	@IDEventHost int,
	@IDPlaceOfEvent int,
	@IDEventStatistics int,
	@IDTicket int
as
	insert into [Event] (EventName, DateOfEvent, TimeOfStart, TimeOfEnd, Info, IDLocation, IDEventHost, IDPlaceOfEvent, IDEventStatistics, IDTicket) values 
		(@EventName, @DateOfEvent, @TimeOfStart, @TimeOfEnd, @Info, @IDLocation, @IDEventHost, @IDPlaceOfEvent, @IDEventStatistics, @IDTicket)
go


-- U
create proc update_event
	@EventID int,
	@EventName nvarchar(200),
	@DateOfEvent date,
	@TimeOfStart time,
	@TimeOfEnd time,
	@Info nvarchar(1000), 
	@IDLocation int,
	@IDEventHost int,
	@IDPlaceOfEvent int,
	@IDEventStatistics int,
	@IDTicket int
as
	update [Event] set EventName = @EventName, DateOfEvent = @DateOfEvent, TimeOfStart = @TimeOfStart, TimeOfEnd = @TimeOfEnd, Info = @Info, IDLocation = @IDLocation, IDEventHost = @IDEventHost, IDPlaceOfEvent = @IDPlaceOfEvent, IDEventStatistics = @IDEventStatistics, IDTicket = @IDTicket
		where EventID = @EventID
go

-- D
create proc delete_event
	@EventID int
as
	delete from [Event] where EventID = @EventID
go

-- R
-- dohvat svih podataka o eventu
create proc select_event_info
	@EventID int
as
	select e.EventName, e.DateOfEvent, e.TimeOfStart, e.TimeOfEnd, e.Info as 'Event info', es.NumberOfInterested, es.NumberOfGoing,
		l.[State], l.City, l.StreetName, l.Coordinates, eh.Firstname as 'Host name', eh.Lastname as 'Host surname', eh.Info as 'Event host info', poe.Info as 'Info about events place',
		t.PriceInKunas, t.Info as 'Ticket Info', t.QRCode from [Event] as e
	left join EventStatistics as es on es.EventStatisticsID = e.IDEventStatistics
	left join [Location] as l on l.LocationID = e.IDLocation
	left join EventHost as eh on eh.EventHostID = e.IDEventHost
	left join PlaceOfEvent as poe on poe.PlaceOfEventID = e.IDPlaceOfEvent
	left join Ticket as t on t.TicketID = e.IDTicket
	where EventID = @EventID
go


-- pregled svih evenata
create proc select_all_events
as
	select 
		e.EventName, e.DateOfEvent, e.TimeOfStart, e.TimeOfEnd, e.Info as 'Event info', 
		es.NumberOfInterested, es.NumberOfGoing,
		l.[State], l.City, l.StreetName, l.Coordinates,
		eh.Firstname, eh.Lastname, eh.Info as 'Event host info',
		poe.PlaceName, poe.Info as 'Info about events place',
		t.PriceInKunas, t.Info as 'Ticket Info', t.QRCode 
	from [Event] as e
	left join EventStatistics as es on es.EventStatisticsID = e.IDEventStatistics
	left join [Location] as l on l.LocationID = e.IDLocation
	left join EventHost as eh on eh.EventHostID = e.IDEventHost
	left join PlaceOfEvent as poe on poe.PlaceOfEventID = e.IDPlaceOfEvent
	left join Ticket as t on t.TicketID = e.IDTicket
go
	
-- dohvat lokacije eventa + place of event(bar/kafic...)
create proc select_event_location
	@EventID int
as
	select l.[State], l.City, l.StreetName, l.Coordinates
	from [Event] as e
	left join [Location] as l on l.LocationID = e.IDLocation
	where EventID = @EventID
go

-- dohvat statistika za odredeni hostov event
create proc select_event_statistics_by_host
	@EventHostID int
as
	select eh.EventHostID, e.EventName, e.DateOfEvent, e.TimeOfStart, e.TimeOfEnd, es.NumberOfInterested, es.NumberOfGoing, es.NumberOfBoughtTickets
	from [Event] as e
	left join EventHost as eh on eh.EventHostID = e.IDEventHost
	left join EventStatistics as es on es.EventStatisticsID = e.IDEventStatistics
	where EventHostID = @EventHostID
go

-- dohvat info o hostu za event
create proc select_host_by_event
	@EventID int
as
	select eh.EventHostID, eh.FirstName, eh.LastName, eh.Info, e.EventName, e.DateOfEvent, e.TimeOfStart, e.TimeOfEnd
	from [Event] as e
	left join EventHost as eh on eh.EventHostID = e.IDEventHost
	where EventID = @EventID
go

--HOST
-- CRUD host
-- C
create proc insert_host
	@Email nvarchar(100),
	@Password nvarchar(20),
	@FirstName nvarchar(30),
	@LastName nvarchar(30),
	@IBAN nvarchar(40),
	@Info nvarchar(1000),
	@IDAvailableFunds int
as
	insert into EventHost (Email, [Password], FirstName, LastName, IBAN, Info, IDAvailableFunds) values 
		(@Email, @Password, @FirstName, @LastName, @IBAN, @Info, @IDAvailableFunds)
go

-- D
create proc delete_host
	@EventHostID int
as
	delete from EventHost where EventHostID = @EventHostID
go


-- U
create proc update_host
	@EventHostID int,
	@Email nvarchar(100),
	@Password nvarchar(20),
	@FirstName nvarchar(30),
	@LastName nvarchar(30),
	@IBAN nvarchar(40),
	@Info nvarchar(1000),
	@IDAvailableFunds int
as
	update EventHost set Email = @Email, [Password] = @Password, FirstName = @FirstName, LastName = @LastName, IBAN = @IBAN, Info = @Info, IDAvailableFunds = @IDAvailableFunds
		where EventHostID = @EventHostID
go

-- R
-- dohvat svih podataka o hostu
create proc select_host_info
	@EventHostID int
as
	select eh.Email, eh.FirstName, eh.LastName, eh.Info from EventHost as eh
	where EventHostID = @EventHostID
go

-- dohvat dostupne svote novca hosta
create proc select_host_account_balance
	@EventHostID int
as
	select af.AvailableMoney , eh.IBAN from EventHost as eh
	left join AvailableFunds as af on af.AvailableFundsID = eh.IDAvailableFunds
	where EventHostID = @EventHostID
go

-- dohvat hostovih placeova(odabere jedan od sojih mogucih za organiziranje eventa)
create proc select_all_hosts_placeofevent
	@EventHostID int
as
	select poe.PlaceName, poe.Info from PlaceOfEvent as poe
	left join EventHost as eh on eh.EventHostID = poe.IDEventHost
	where EventHostID = @EventHostID
go
-- dohvat svih hostovih evenata
create proc select_all_hosts_events
	@EventHostID int
as
	select e.EventName, e.DateOfEvent from [Event] as e
	left join EventHost as eh on eh.EventHostID = e.IDEventHost
	where EventHostID = @EventHostID
go


--PlaceOfEvent
--CRUD
--C
create proc insert_placeofevent
	@PlaceName nvarchar(100),
	@Info nvarchar(1000),
	@IDReview int,
	@IDEventHost int
as
	insert into PlaceOfEvent (PlaceName, Info, IDReview, IDEventHost) values 
	(@PlaceName, @Info, @IDReview, @IDEventHost)
go

--U
create proc update_placeofevent
	@PlaceOfEventID int,
	@PlaceName nvarchar(100),
	@Info nvarchar(1000),
	@IDReview int,
	@IDEventHost int
as
	update PlaceOfEvent set PlaceName = @PlaceName, Info = @Info, IDReview = @IDReview, IDEventHost = @IDEventHost
	where PlaceOfEventID = @PlaceOfEventID
go

--D
create proc delete_placeofevent
	@PlaceOfEventID int
as
	delete from PlaceOfEvent where PlaceOfEventID = @PlaceOfEventID
go

--Ticket
--CRUD
-- C
create proc insert_ticket
	@PriceInKunas money,
	@Info nvarchar(1000),
	@QRCode nvarchar(40)
as 
	insert into Ticket (PriceInKunas, Info, QRCode) values (@PriceInKunas, @Info, @QRCode)
go

-- R
create proc select_ticket
	@TicketID int
as 
	select t.* from Ticket as t
	where TicketID = @TicketID
go

-- D
create proc delete_ticket
	@TicketID int
as
	delete from Ticket where TicketID = @TicketID
go

-- dohvati podatke o karti za event
create proc select_ticket_info_for_event
	@EventID int
as
	select t.* from Ticket as t
	left join [Event] as e on e.IDTicket = t.TicketID
	where EventID = @EventID
go

--Review
--CRUD
--C
create proc insert_review
	@Info nvarchar(1000),
	@DateMade datetime,
	@Score int,
	@IDUser int
as
	insert into Review (Info, DateMade, Score, IDUser) values
		(@Info, @DateMade, @Score, @IDUser)
go

--R
create proc select_review_for_placeofevent
	@PlaceOfEventID int
as
	select r.Info, r.DateMade, r.Score from Review as r
	left join PlaceOfEvent as poe on poe.IDReview = r.ReviewID
	where PlaceOfEventID = @PlaceOfEventID
go

create proc select_review_by_user
	@UserID int
as
	select poe.PlaceName, r.Info, r.DateMade, r.Score from Review as r
	left join [User] as u on u.UserID = r.IDUser
	left join PlaceOfEvent as poe on poe.IDReview = r.ReviewID
	where UserID = @UserID
go	


--Location
--CRUD
create proc insert_location
	@State nvarchar(30),
	@City nvarchar(40),
	@StreetName nvarchar(40),
	@Coordinates geography
as
	insert into [Location] ([State], City, StreetName, Coordinates) values
		(@State, @City, @StreetName, @Coordinates)
go

-- R
create proc select_location_info
	@LocationID int
as 
	select * from [Location]
go

--U
create proc update_location
	@LocationID int,
	@State nvarchar(30),
	@City nvarchar(40),
	@StreetName nvarchar(40),
	@Coordinates geography
as
	update [Location] set [State] = @State, City = @City, StreetName = @StreetName, Coordinates = @Coordinates
	where LocationID = @LocationID
go

-- D
create proc delete_location
	@LocationID int
as
	delete from [Location] where LocationID = @LocationID
go


--AvailableFunds
--CRUD
-- C
create proc insert_funds
	@AvailableMoney money
as
	insert into AvailableFunds (AvailableMoney) values (@AvailableMoney)
go

--U
create proc update_funds
	@AvailableFundsID int,
	@AvailableMoney money
as
	update AvailableFunds set AvailableMoney = @AvailableMoney
	where AvailableFundsID = @AvailableFundsID
go

--Transactions
--CRUD
--C
create proc insert_transaction
	@TimeOfPurchase datetime,
	@Info nvarchar(1000),
	@IDTicket int,
	@IDUser int
as
	insert into [Transaction] (TimeOfPurchase, Info, IDTicket, IDUser) values
		(@TimeOfPurchase, @Info, @IDTicket, @IDUser)
go

--U
create proc update_transaction
	@TransactionID int,
	@TimeOfPurchase datetime,
	@Info nvarchar(1000),
	@IDTicket int,
	@IDUser int
as
	update [Transaction] set TimeOfPurchase = @TimeOfPurchase, Info = @Info, IDTicket = @IDTicket, IDUser = @IDUser
	where TransactionID = @TransactionID
go

--D
create proc delete_transaction
	@TransacitionID int
as
	delete from [Transaction] where TransactionID = @TransacitionID
go
-------------------------------------------------------------

--admin stats procedure (for admin only)
create proc select_webpage_statistics
as 
	select * from WebPageStatistics
go

create proc clean_eventplannerdb
as
	delete from AvailableFunds
	delete from CreditCard
	delete from [Event]
	delete from EventHost
	delete from EventStatistics
	delete from [Location]
	delete from PlaceOfEvent
	delete from Review
	delete from Ticket
	delete from [Transaction]
	delete from [User]
	delete from WebPageStatistics
go

