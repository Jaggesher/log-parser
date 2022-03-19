# Log Parser

The application find all the log messages with the level error [or others] and print them into the output file.

### Input Log format

```
<ISO Date> - <Log Level> - {"transactionId: "<UUID>", "details": "<message event/action description>", "err": "<Optionall, error description>", ...<additional log information>}
```

### Output Log format

```
[{"timestamp": <Epoch Unix Timestamp>, "loglevel": "<loglevel>", "transactionId: "<UUID>", "err": "<Error message>" }]
```

---

## Project setup

- ### Clone Repo

    ```
    git clone https://github.com/Jaggesher/log-parser.git
    ```

- ### Install dependencies

    ```
    yarn install
    ```

- ### Compile typescript

    ```
    yarn build
    ```

- ### Run tests

    ```
    yarn test
    ```

- ### Test Application

    ```
    node dist/parser.js --input ./sample.log --output ./out.log
    ```

---

## Uses

```
node dist/parser.js --input [InputFile] --output [OutputFile]
```
