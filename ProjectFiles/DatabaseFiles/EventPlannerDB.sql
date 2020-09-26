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

go
create table Ticket
(
	TicketID int primary key identity,
	PriceInKunas int,
	Info nvarchar(1000)
)
create table [Transaction]
(
	TransactionID int primary key identity,
	TimeOfPurchase datetime,
	Info nvarchar(1000),
	IDTicket int foreign key references Ticket(TicketID),
	IDUser int foreign key references [User](UserID)
)
go
create table [Event]
(
	EventID int primary key identity,
	Title nvarchar(200),
	Starting datetime2(2),
	Ending datetime2(2),
	--Info nvarchar(1000),
	IDUser int foreign key references [User](UserID),
	IDTicket int foreign key references Ticket(TicketID),
	--City nvarchar(50),
	Adresse nvarchar(100)
)
---update-----
--alter table [Event] add City nvarchar(50), Adresse nvarchar(100)
--go

--alter table [Event] add longitude decimal(9,6), latitude decimal(8,6)
--go
--alter table [Event] drop column Info

--update [Event] set latitude = 45.8145, longitude = 15.95299 where Adresse = 'Ilica 201'
--update [Event] set latitude = 45.8131, longitude = 15.93299 where Adresse = 'Ilica 191'
--update [Event] set latitude = 45.8125, longitude = 15.92299 where Adresse = 'Ilica 203'
--update [Event] set latitude = 45.81258, longitude = 15.94968 where Adresse = 'Ilica 210'
--update [Event] set latitude = 45.81257, longitude = 15.96226 where Adresse = 'Ilica 110'
--update [Event] set latitude = 45.80176, longitude = 15.96357 where Adresse = 'Savska cesta 32'
--update [Event] set latitude = 45.81304, longitude = 16.01369 where Adresse = 'Svetice 15'

--insert into [Event] (Title, Starting, Ending, Info, IDUser, IDTicket, City, Adresse) values ('Event 1', '2020-11-11 16:00:00.00', '2020-11-10 16:00:00.00', 'Event info 1', 2,1, 'Zagreb', 'Ilica 210')
--insert into [Event] (Title, Starting, Ending, Info, IDUser, IDTicket, City, Adresse, longitude, latitude) values 
--	('Event 3', '2020-11-11 16:00:00.00', '2020-11-10 16:00:00.00', 'Event info 3', 2,1, 'Zagreb', 'Ilica 111', 45.81258, 15.95117)

--update [Event] set IDLocation = null
--('Zagreb', 'Ilica 203', 45.8131, 15.94299), ('Zagreb', 'Ilica 210', 45.81258, 15.94968), ('Zagreb', 'Ilica 110', 45.81257, 15.96226),
--																   ('Zagreb', 'Savska cesta 32', 45.80176, 15.96357), ('Zagreb', 'Svetice 15', 45.81304, 16.01369)

select * from [Event]


--update [Event] set City = 'Zagreb', Adresse = 'Ilica 191' where EventID = 1
--update [Event] set City = 'Zagreb', Adresse = 'Ilica 201' where EventID = 2
--update [Event] set City = 'Zagreb', Adresse = 'Ilica 203' where EventID = 3
--update [Event] set City = 'Zagreb', Adresse = 'Ilica 210' where EventID = 4
--update [Event] set City = 'Zagreb', Adresse = 'Ilica 110' where EventID = 5
--update [Event] set City = 'Zagreb', Adresse = 'Savska cesta 32' where EventID = 6
--update [Event] set City = 'Zagreb', Adresse = 'Svetice 15' where EventID = 7
--update [Event] set City = 'Zagreb', Adresse = 'Ilica 191' where EventID = 8


create table [Going]
(
	GoingID int primary key identity,
	IDUser int foreign key references [User](UserID),
	IDEvent int foreign key references [Event](EventID)
)
go

go
--create proc insert_dummy_data
--as
--	insert into AvailableFunds (AvailableMoney) values (100), (124), (1234), (1999)
--	insert into CreditCard (CardName) values ('Mastercard '), ('Visa'), ('American Express')
--	--insert into [Location] (City, Adresse, longitude, latitude) values ('Zagreb', 'Ilica 191', 53.339688, -6.236688), ('Zagreb', 'Ilica 201', 45.815399, 15.966568)
--	insert into [User] (Email, [Password], FirstName, LastName, Age, IBAN, Info, AdminUser, IDCreditCard, IDAvailableFunds) values 
--		('test@mail.com', 'pass', 'Ana', 'Anic', 22, '', 'Lorem ipsum dolor sit amet', 1, 1, 1), ('test1@mail.com', 'pass', 'Matea', 'Mateic', 29, 'HRV12325432445', 'Lorem ipsum dolor sit amet', 0, 2, 2)
--		, ('test2@mail.com', 'pass', 'Ivo', 'Ivic', 18, 'HRV999888777666', 'Lorem ipsum dolor sit amet', 0, 3, 2)
--	insert into Ticket (PriceInKunas, Info) values (120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis'), (60, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis')
--	insert into [Transaction] (TimeOfPurchase, Info, IDTicket, IDUser) values ('12:00', 'Lorem Ipsum', 1, 1), ('21:36', 'Lorem Ipsum', 2, 2)
--	insert into [Event] (Title, Starting, Ending, Info, IDUser, IDTicket) 
--		values ('Lorem ipsum dolor sit amet', '01-01-2020 16:00:00', '01-01-2020 22:00:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque.',
--		1,1), ('Lorem ipsum dolor sit amet','02-02-2020 21:00:00', '02-03-2020 00:05:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis, elit quis feugiat efficitur, dolor eros commodo quam, eget venenatis nisl risus eu diam. Donec suscipit orci a pulvinar lobortis. Sed venenatis dui turpis, placerat vestibulum mi imperdiet eu. Praesent sed posuere tortor. Cras ac quam neque.',
--		2,2)
--	insert into Going (IDUser, IDEvent) values (1,1), (2,1), (1,2), (2,2), (3,2)
--go

--update [Event] set City = 'Zagreb', Adresse = 'Ilica 191' where EventID = 1
--update [Event] set City = 'Zagreb', Adresse = 'Ilica 201' where EventID = 2

--exec insert_dummy_data
--go


--drop proc insert_dummy_data
--go
--go

create proc delete_user
	@userid int
as
	if exists(select UserID from [User] where UserID = @userid) begin
		begin try 
			begin transaction
				update [Event] set IDUser = null where IDUser = @userid
				delete from Going where IDUser = @userid
				delete from [Transaction] where IDUser = @userid
				delete [User] where UserID = @userid
			commit tran
		end try
		begin catch
			if @@TRANCOUNT > 0
                rollback tran
            select null;
        end catch
	end
	else begin
		select null
    end
go

--select * from [User]
--select * from [Event]
--select * from [Transaction] where IDUser = 6
--select * from Going where IDUser = 6
--go

--insert into [User] (Email, [Password]) values ('test', 'test')
--insert into [Event] (Title,IDUser) values ('test', 6)
--insert into Going (IDUser) values (6)
--insert into [Transaction] (IDUser) values (6)

--drop proc delete_user
--exec delete_user 6

--delete [Event] where Title = 'test'

--delete [User] where UserID = 5

create proc delete_event
	@eventid int
as
	if exists(select EventID from [Event] where EventID = @eventid) begin
		begin try 
			begin transaction
				delete from Going where 
                    IDEvent in(
                        select EventID from [Event] where EventID=@eventid
                    )
				delete [Event] where EventID = @eventid
			commit tran
		end try
		begin catch
			if @@TRANCOUNT > 0
                rollback tran
            select null;
        end catch
		end
	else begin
		select null;
    end
go

--select * from Going
--select * from [Event]
--insert into [Event] (Title) values ('test')
--insert into Going (IDEvent, IDUser) values (49,3)

--update [Event] set Info = 'test' where EventID = 50
--select * from Going

--drop proc delete_event
--go
--exec delete_event 45
--delete Going where GoingID = 8


--select * from [Event]

--insert into [Location] (City, Adresse, latitude, longitude) values ('Zagreb', 'Ilica 203', 45.8131, 15.94299), ('Zagreb', 'Ilica 210', 45.81258, 15.94968), ('Zagreb', 'Ilica 110', 45.81257, 15.96226),
--																   ('Zagreb', 'Savska cesta 32', 45.80176, 15.96357), ('Zagreb', 'Svetice 15', 45.81304, 16.01369)

--insert into [Event] (Title,Starting,Ending,Info, IDUser, IDTicket) values ('Event 7', '2020-11-11 16:00:00.00', '2020-11-10 16:00:00.00', 'Event info 7', 1, 1),
--																					  ('Event 8', '2020-11-11 16:00:00.00', '2020-11-10 16:00:00.00', 'Event info 8', 1, 1),
--																					  ('Event 9', '2020-11-11 16:00:00.00', '2020-11-10 16:00:00.00', 'Event info 9', 1, 1),
--																					  ('Event 10', '2020-11-12 16:00:00.00', '2020-11-10 16:00:00.00', 'Event info 10', 1, 1),
--																					  ('Event 11', '2020-11-12 16:00:00.00', '2020-11-10 16:00:00.00', 'Event info 11', 1, 1)



--select e.Title, e.Starting,e.Ending, e.Info, l.City, l.Adresse from [Event] as e
--left join [Location] as l on l.LocationID = e.IDLocation
--where l.City = @city, l.Adresse = @adresse
--go

--create proc near_events
--	@city nvarchar(40),
--	@adresse nvarchar(100)
--as
--	select e.Title, e.Starting,e.Ending, e.Info, l.City, l.Adresse from [Event] as e
--	left join [Location] as l on l.LocationID = e.IDLocation
--	where l.City = @city and l.Adresse = @adresse
--go


create proc near_me
	@datetime datetime2(2),
	@offset float,
	@long decimal(9,6),
	@lat decimal(8,6)
as
	select e.* from [Event] as e
	where e.longitude < @long + @offset and e.latitude < @lat + @offset and e.longitude > @long - @offset and e.latitude > @lat - @offset
	and e.Starting >= @datetime
	order by e.Starting desc
go
	

--drop proc near_me
--go

--exec near_me '2020-09-09 19:00:00.00', 0.05, 15.932990, 45.813100
----go

--select * from [Event]
--go

--select e.*, l.City, l.Adresse, l.latitude, l.longitude from Event as e left join Location as l on l.LocationID = e.IDLocation where l.longitude < 15.95117 + 0.05 and l.latitude < 45.81258  + 0.05
--and l.longitude > 15.95117 - 0.05 and l.latitude > 45.81258  - 0.5 and e.Starting >= '2020-11-11 19:00:00.00' order by e.Starting desc

--select IDUser from [Event] where EventID = 1

--select IDUser from Going where IDEvent = 2


select * from Going 

--delete from Going where IDUser = 1 and IDEvent = 1

--select e.* from Going as g
--left join [Event] as e on g.IDEvent = e.EventID
--left join [User] as u on g.IDUser = u.UserID
--where g.IDUser = 3

--select * from Going

--Exec delete_event 9
select * from [User]
select * from [Event]
 
-- delete from Going where GoingID = 29

--insert into Going values (1,9)

--select e.* from Going as g left join [Event] as e on g.IDEvent = e.EventID left join [User] as u on g.IDUser = u.UserID where g.IDUser = 1

--insert into [Event] (Title) values ('test5')

--exec delete_event 44

--delete from [Event] where EventID = 44

--delete from [Event] where EventID in (10,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43)

--update [Event] set Info = 'test' , City = 'Zagreb' where EventID = 47