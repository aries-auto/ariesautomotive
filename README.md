ariesautomotive
===============

## Aries Automotive Website Redesign

### Testing

#### Unit Testing

```bash
   > gulp test
```

#### e2e Testing

This step will require having 3 terminal windows open simultaneously.

Install chromedriver

```bash
   > brew install chromedriver
```

Start the webdriver standalone server ( Terminal 1 )

```bash
   > webdriver-manager start --standalone`
```

Start the application ( Terminal 2 )

```bash
   > goapp serve
```

Run Protractor ( Terminal 3 )

```bash
   > gulp protractor
```

Finally

```bash
   > say protractor is friggin sweet
```