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
    expectXAxisTicks(container, ['Page A', 'Page B', 'Page C']);
    expect(spy).toHaveBeenLastCalledWith(['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F']);
});
