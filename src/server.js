import App from './app';

const PORT = process.env.PORT || 3001;

App.listen(PORT, err => {
  if (err) {
    console.log('Error');
  } else {
    console.log('Server is running on port 3001...');
  }
});
