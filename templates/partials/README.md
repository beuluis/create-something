<!-- ABOUT THE PROJECT -->

## About The Project

{{ description }}. Using [create-helper](https://github.com/beuluis/create-helper) and generated with [create-something](https://github.com/beuluis/create-something)

## Usage

```bash
npm create {{ name | replace: "create-", ""}} <create_path>
# or
npx {{ name }} <create_path>
```

## Templates

-   `standard` - Default template

## Use different template

```bash
npm create {{ name | replace: "create-", ""}} --template <template_name>
# or
npx {{ name }} --template <template_name>
```
