Commandes:
```
dropdb lbf
create lbf
sqitch deploy &&
psql -U postgres -d lbf -f ./data/importFakeData.sql && 
psql -U postgres -d lbf -f ./data/dummyData/importUser.sql && 
psql -U postgres -d lbf -f ./data/dummyData/importEvent.sql && 
psql -U postgres -d lbf -f ./data/dummyData/importEventHasTag.sql && 
psql -U postgres -d lbf -f ./data/dummyData/importUserLearnLanguage.sql && 
psql -U postgres -d lbf -f ./data/dummyData/importUserSpeakLanguage.sql && 
psql -U postgres -d lbf -f ./data/dummyData/importUserParticipateEvent.sql
```
```
dropdb lbf &&
createdb lbf &&
sqitch deploy &&
psql -U postgres -d lbf -f ./data/dummyData/importNewFakeData.sql
```


psql -d postgres://voajukmwjczukq:83f22c219d3b52f048a634267d609618703e992366207fec358b580a3b516de5@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/de29ouuaa0inj3 -f ./data/importFakeData.sql && 
psql -d postgres://voajukmwjczukq:83f22c219d3b52f048a634267d609618703e992366207fec358b580a3b516de5@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/de29ouuaa0inj3 -f ./data/dummyData/importUser.sql && 
psql -d postgres://voajukmwjczukq:83f22c219d3b52f048a634267d609618703e992366207fec358b580a3b516de5@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/de29ouuaa0inj3 -f ./data/dummyData/importEvent.sql && 
psql -d postgres://voajukmwjczukq:83f22c219d3b52f048a634267d609618703e992366207fec358b580a3b516de5@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/de29ouuaa0inj3 -f ./data/dummyData/importEventHasTag.sql && 
psql -d postgres://voajukmwjczukq:83f22c219d3b52f048a634267d609618703e992366207fec358b580a3b516de5@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/de29ouuaa0inj3 -f ./data/dummyData/importUserLearnLanguage.sql && 
psql -d postgres://voajukmwjczukq:83f22c219d3b52f048a634267d609618703e992366207fec358b580a3b516de5@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/de29ouuaa0inj3 -f ./data/dummyData/importUserSpeakLanguage.sql && 
psql -d postgres://voajukmwjczukq:83f22c219d3b52f048a634267d609618703e992366207fec358b580a3b516de5@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/de29ouuaa0inj3 -f ./data/dummyData/importUserParticipateEvent.sql

psql -d postgres://voajukmwjczukq:83f22c219d3b52f048a634267d609618703e992366207fec358b580a3b516de5@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/de29ouuaa0inj3 -f ./data/importFakeData.sql && 


postgres://voajukmwjczukq:83f22c219d3b52f048a634267d609618703e992366207fec358b580a3b516de5@ec2-54-228-139-34.eu-west-1.compute.amazonaws.com:5432/de29ouuaa0inj3

Pour lancer la commande sans copier coller dans le terminal:
```bash
createdb lbf
dbinit
```

Le ``dbInit`` est effectué grace à la dépendance shelljs