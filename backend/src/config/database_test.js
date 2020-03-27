module.exports = {
    server: 'TRADER',
    dialect: 'mssql',
    database: 'OmniElevenTest',
    username: 'sa',
    password: '123456',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',
            password: '123456'
        }
    },
    options: {
        database: 'OmniElevenTest',
        rowCollectionOnDone: true,
        useColumnNames: false,
        encrypt: false,
        trustServerCertificate: false
    },
    define: {
        timestamps: true,
        // underscored: true,
        freezeTableName: true,
    }
}