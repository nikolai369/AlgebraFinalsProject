User(korisnik)
    - KorisnikID
    - ime
    - prezime
    - godine
    - IDTransakcija
    - IDKartica
    - IDRacun

Događaj
    - dogadajID
    - location
    - date
    - time of start
    - time of end
    - info
    - IDOrganizator
    - IDKlub
    - IDKarta
    - IDEventStats

EventStats
    - eventStatsID
    - number of interested
    - number of going
    - broj kupljenih karata

Karta
    - kartaID
    - cijena
    - info
    - qr_code

Organizator
    - organizatorID
    - ime
    - prezime
    - IBAN
    - info o organizatoru
    - IDTransakcija
    - IDRacun

Klub/lokal/prostor
    - klubID
    - lokacija
    - info
    - galerija
    - IDReview
    - IDOrganizator

Review
    - reviewID
    - info
    - date made
    - score(1/10)
    - IDKorisnik

Kartica
    - karticaID
    - ime_kartice

Transakcija
    - transakcijaID
    - date and time of purchase
    - total price
    - info
    - IDKarta

Racun_s_raspolozivim_sredstvima(organizatorova zarada/korisnikovi bodovi)
    - racunID
    - kolicina_novca/bodova
    
Admin
    - username
    - pass

WebPageStatistics (for admin)
    - webPageStatisticsID
    - number of sold tickets
    - number of people going to all events
    - number of interested to all events
    - number of events made
    - number of registered users
    - number of registered organizators
    - total money made by selling tickets
    - avg tickets sold by day
    - --||-- week
    - --||-- month

