import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';

export function DownloadPage() {
  return (
    <div className="app">
      <h1 className="welcome__text">Download the Loveworld UCC 360 app here</h1>

      <img src="/UCCNEW.png" alt="logo" />
      <div className="form__wrapper container mx-auto">
        <div className="btn__center">
          <form method="get" action="/loveworlducc360.apk">
            <Button
              // onClick={() => window.open('/loveworlducc360.apk')}
              variant="primary"
              type="submit"
              className="btn__overwrite btn-lg"
            >
              <i className="fas fa-download"></i>
              Download
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
