function localtunnel {
  lt -s p490qgj904qjnqe09009a90jalscnnanc3333939 --port 5000
}

until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done


# make sure to add chmod u+x sendgrid_webhook.sh and test for ls -l -rwx in ther user permissions strong