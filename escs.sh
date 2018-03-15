##############################################################################
# push, update.

cd ~/projects/django-jsim-code-code
git status
git add *
git commit -a
git push



# merge, dev, into, master:
git checkout master
git merge staging
git push -u origin master
git checkout staging
