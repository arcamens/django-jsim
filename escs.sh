##############################################################################
# push, update.

cd ~/projects/django-jsim-code
git status
git add *
git commit -a
git push



# merge, dev, into, master:
git checkout master
git merge staging
git push -u origin master
git checkout staging
##############################################################################

git tag -a 0.0.1 -m 'Initial release'
git push origin : 0.0.1

git tag -a 0.0.7 
git push origin :0.0.7

git tag -a 1.0.7
git push origin : 1.0.7

git tag -d 1.0.7
git push origin :1.0.7


