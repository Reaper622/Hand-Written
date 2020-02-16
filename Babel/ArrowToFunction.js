// 词法分析器

const tokenizer = (code) => {
    // 存储 token 的数组
    const token = [];

    // 指针
    let current = 0;

    while(current < code.length) {
        // 获取指针指向的字符
        const char = code[current];

        // 处理单字符语法单元
        if(char === '(' || char === ')') {
            token.push({
                type: 'parens',
                value: char
            });

            current++;

            continue;
        }


        // 处理标识符 标识符一般以字母、_、$开头的连续字符
        if(/[a-zA-Z\$\_]/.test(char)) {
            let value = '';
            value += char;
            current++;

            // 拼接连续字符
            while(/[a-zA-Z0-9\$\_]/.test(code[current]) && current < code.length) {
                value += code[current];
                current++;
            }

            token.push({
                type: 'identifier',
                value
            });

            continue;
        }

         // 处理空白字符
         if (/\s/.test(char)) {
            let value = '';
            value += char;
            current ++;

            // 拼接连续空白字符
            while (/\s]/.test(code[current]) && current < code.length) {
                value += code[current];
                current ++;
            }

            token.push({
                type: 'whitespace',
                value,
            });

            continue;
        }

        // 处理逗号分隔符
        if(/,/.test(char)) {

            token.push({
                type: ',',
                value: ','
            });

            current++;
            continue;
        }

        // 处理运算符
        if (/=|\+|>/.test(char)) {
            let value = '';
            value += char;
            current ++;

            while(/=|\+|>/.test(code[current])) {
                value += code[current];
                current ++;
            }

            if(value === '=>') {
                token.push({
                    type: 'ArrowFunctionExpression',
                    value
                });
                continue;
            }

            token.push({
                type: 'operator',
                value,
            });

            continue;
        }

        // 碰到词法分析词以外的字符 报错
        throw new TypeError('Wrong character take in ' + char);
    }

    return token;
}



const parser = tokens => {
    // 声明一个全时指针一直存在
    let current = -1;

    // 声明一个暂存栈 用于存放临时指针
    const tem = [];

    // 指针指向的当前token
    let token = tokens[current];
    
    // 解析声明语句
    const parseDeclarations = () => {
        // 暂存当前指针
        setTem();

        // 指针后移
        next();

        // 如果字符为'const'可见是一个声明
        if(token.type === 'identifier' && token.value === 'const') {
            const declarations = {
                type: 'VariableDeclaration',
                kind: token.value
            };

            next();

            // 声明后面要跟变量 如果不是就报错
            if (token.type !== 'identifier') {
                throw new Error('Expected Variable after const');
            }

            // 我们获取到了变量名称
            declarations.identifierName = token.value;

            next();

            // 如果跟着 '=' 那么后面应该是表达式或者常量之类的
            if (token.type === 'operator' && token.value === '=') {
                declarations.init = parseFunctionExpression();
            }

            return declarations;

        }
    };

    const parseFunctionExpression = () => {
        next();

        let init;

        // 如果 '=' 后面跟着括号或者字符那基本判断是一个表达式
        if ((token.type === 'parens' && token.value === '(') || token.type === 'identifier') {
            // 暂存当前指针
            setTem();
            // 指针后移
            next();

            while(token.type === 'identifier' || token.type === ',') {
                next();
            }

            // 如果括号后跟着箭头 那么判断是箭头函数的函数表达式
            if (token.type === 'parens' && token.value === ')') {
                next();
                if (token.type === 'ArrowFunctionExpression') {
                    init = {
                        type: 'ArrowFunctionExpression',
                        params: [],
                        body: {}
                    };
    
                    backTem();
    
                    // 解析箭头函数的参数
                    init.params = parseParams();
    
                    // 解析箭头函数的函数主体
                    init.body = parseExpression();
                } else {
                    backTem();
                }
            }
        }

        return init;
    };

    // 解析参数
    const parseParams = () => {
        const params = [];
        if (token.type === 'parens' && token.value === '(') {
            next();
            while(token.type !== 'parens' && token.value !== ')') {
                if (token.type === 'identifier') {
                    params.push({
                        type: token.type,
                        identifierName: token.value
                    });
                }
                next();
            }
        }
        return params;
    }

    const parseExpression = () => {
        next();
        let body;
        while(token.type === 'ArrowFunctionExpression') {
            next();
        }

        // 如果以(开头或者变量开头说明不是 BlockStatement 用二元表达式来解析)
        if (token.type === 'identifier') {
            body = {
                // 二元表达式
                type: 'BinaryExpression',
                left: {
                    type: 'identifier',
                    identifierName: token.value
                },
                operator: '',
                right: {
                    type: '',
                    identifierName: ''
                }
            };
            next();

            if (token.type === 'operator') {
                body.operator = token.value;
            }

            next();

            if(token.type === 'identifier') {
                body.right = {
                    type: 'identifier',
                    identifierName: token.value
                };
            }
        }

        return body;
    }


    // 指针后移的函数
    const next = () => {
        // 默认跳过空格
        do {
            ++current;
            token = tokens[current] ? tokens[current] : { type: 'eof', value: ''};
        } while (token.type === 'whitespace')
    };

    // 指针暂存的函数
    const setTem = () => {
        tem.push(current);
    }

    // 指针回退函数
    const backTem = () => {
        current = tem.pop();
        token = tokens[current];
    };

    const ast = {
        type: 'Program',
        body: []
    };

    while(current < tokens.length) {
        const statement = parseDeclarations();
        if (!statement) {
            break;
        }
        ast.body.push(statement);
    }
    return ast;
};


// 代码转换
const traverser = (ast, visitor) => {

    // 如果节点是数组那么遍历数组
    const traverseArray = (array, parent) => {
        array.forEach((child) => {
            traverseNode(child, parent);
        })
    };

    // 遍历 ast 节点
    const traverseNode = (node, parent) => {
        const method = visitor[node.type];

        if (method) {
            method(node, parent);
        }

        switch(node.type) {
            case 'Program': traverseArray(node.body, node);
                break;

            case 'VariableDeclaration': traverseArray(node.init.params, node.init);
                break;

            case 'identifier':
                break;
            default:
                throw new TypeError(node.type);
        }
    };
    traverseNode(ast, null);
}

const transformer = (ast) => {

    // 转换出的新 ast
    const newAst = {
        type: 'Program',
        body: []
    };

    // 在老 ast 上加一个指针指向新 ast
    ast._context = newAst.body;

    traverser(ast, {
        // 对于变量声明的处理方法
        VariableDeclaration: (node, parent) => {
            let functionDeclaration = {
                params: []
            };
            // 如果是箭头函数
            if (node.init.type === 'ArrowFunctionExpression') {
                functionDeclaration.type = 'FunctionDeclaration';
                functionDeclaration.identifierName = node.identifierName;
            }

            // 如果是二元表达式
            if (node.init.body.type === 'BinaryExpression') {
                functionDeclaration.body = {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ReturnStatement',
                        argument: node.init.body
                    }],
                };
            }

            parent._context.push(functionDeclaration);
        },

        //对于字符的处理方法
        identifier: (node, parent) => {
            if (parent.type === 'ArrowFunctionExpression') {
                ast._context[0].params.push({
                    type: 'identifier',
                    identifierName: node.identifierName
                });
            }
        }
    });

    return newAst;
};

// 代码生成器
const generator = (node) => {
    switch (node.type) {
    // 如果是 `Program` 结点，那么我们会遍历它的 `body` 属性中的每一个结点，并且递归地
    // 对这些结点再次调用 codeGenerator，再把结果打印进入新的一行中。
    case 'Program':
        return node.body.map(generator)
            .join('\n');

    // 如果是FunctionDeclaration我们分别遍历调用其参数数组以及调用其 body 的属性
    case 'FunctionDeclaration':
        return 'function' + ' ' + node.identifierName + '(' + node.params.map(generator) + ')' + ' ' + generator(node.body);

    // 对于 `Identifiers` 我们只是返回 `node` 的 identifierName
    case 'identifier':
        return node.identifierName;

    // 如果是BlockStatement我们遍历调用其body数组
    case 'BlockStatement':
        return '{' + node.body.map(generator) + '}';

    // 如果是ReturnStatement我们调用其 argument 的属性
    case 'ReturnStatement':
        return 'return' + ' ' + generator(node.argument);
    
    // 如果是ReturnStatement我们调用其左右节点并拼接
    case 'BinaryExpression':
        return generator(node.left) + ' ' + node.operator + ' ' + generator(node.right);

    // 没有符合的则报错
    default:
        throw new TypeError(node.type);

    }
};


const babelComplier = (input) => {
    // 代码解析为语法单元组
    const tokens = tokenizer(input);
    // 语法单元组解析为抽象语法树
    const ast =  parser(tokens);
    // 抽象语法树解析为新的抽象语法书
    const newAst = transformer(ast);
    // 抽象语法书解析为新的代码
    const output = generator(newAst);

    return output;
}
const str = 'const add = (a, b) =>  a + b';

const result = babelComplier(str);

console.log(result);
// function add(a,b) {return a + b}