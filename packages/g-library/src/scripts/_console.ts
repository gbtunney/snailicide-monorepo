export const importantConsoleLog = function (
    message = 'MESSAGE',
    additional_messages = [],
    additionalcss = 'border:1px solid red;'
) {
    console.log(
        `%c ${message} ${additional_messages.toString()}`,
        additionalcss
    )
}
