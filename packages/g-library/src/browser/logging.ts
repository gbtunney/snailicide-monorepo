export const styledConsoleLog = function (
    message = 'MESSAGE',
    additional_messages = [],
    additionalcss = 'border:1px solid red;',
): void {
    console.log(
        `%c ${message} ${additional_messages.toString()}`,
        additionalcss,
    )
}
