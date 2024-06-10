it('should set the scale domain and range based on the axis type, and data', () => {
    const spy = vi.fn();
    const Comp = (): null => {
        const result = useAppSelector(state => selectAxisScale(state, 'xAxis', '0'));
        spy(result.scale?.domain());
        return null;
    };
    const { container } = render(
        <BarChart data={PageData} width={100} height={100}>
            <Bar dataKey="uv" />
            <XAxis dataKey="name" />
            <Customized component={Comp} />
        </BarChart>,
    );
    expectXAxisTicks(container, [{
        textContent: 'Page A',
        x: "0",
        y: "0"
    }, {
        textContent: 'Page B',
        x: "1",
        y: "1"
    }, {
        textContent: 'Page C',
        x: "2",
        y: "2"
    }]);
    expect(spy).toHaveBeenLastCalledWith(['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F']);
});