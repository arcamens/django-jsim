##############################################################################
# Push jsim onto master.

cd ~/projects/django-jsim-code
git status
git add *
git commit -a
git push
##############################################################################
# merge staging into master.
git checkout master
git merge staging
git push -u origin master
git checkout staging
##############################################################################

git tag -a v1.0.0 -m 'First stable release.'
git push origin : v1.0.0

git tag -a v2.0.0 -m 'Abandoning support for django 1.11. Running on django 2.'
git push origin : v2.0.0

##############################################################################
# Create django-v2 branch.

git checkout -b django-v2
git push --set-upstream origin django-v2
##############################################################################
# Create staging branch.
git checkout -b staging
git push --set-upstream origin staging
##############################################################################
# install jsim django-v2 on arcamens django-v2 env.
cd ~/.virtualenvs/
source arcamens-v2/bin/activate
cd ~/projects/django-jsim-code
python setup.py install
rm -fr build

git tag -d 2.0.0
git push origin :2.0.0
##############################################################################
# Upload the package to pypi.
python setup.py sdist register upload
rm -fr dist


